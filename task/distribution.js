const { namespaceWrapper } = require('@_koii/namespace-wrapper');

class Distribution {
  async submitDistributionList(round) {
    console.log('SUBMIT DISTRIBUTION LIST CALLED WITH ROUND', round);
    try {
      const distributionList = await this.generateDistributionList(round);
      if (Object.keys(distributionList).length === 0) {
        console.log('NO DISTRIBUTION LIST GENERATED');
        return;
      }
      const decider = await namespaceWrapper.uploadDistributionList(
        distributionList,
        round,
      );
      console.log('DECIDER', decider);
      if (decider) {
        const response =
          await namespaceWrapper.distributionListSubmissionOnChain(round);
        console.log('RESPONSE FROM DISTRIBUTION LIST', response);
      }
    } catch (err) {
      console.log('ERROR IN SUBMIT DISTRIBUTION', err);
    }
  }

  async auditDistribution(roundNumber) {
    console.log('AUDIT DISTRIBUTION CALLED WITHIN ROUND: ', roundNumber);
    await namespaceWrapper.validateAndVoteOnDistributionList(
      this.validateDistribution,
      roundNumber,
    );
  }

  async generateDistributionList(round) {
    try {
      console.log('GENERATE DISTRIBUTION LIST CALLED WITH ROUND', round);
      let distributionList = {};
      let taskAccountDataJSON = await namespaceWrapper.getTaskSubmissionInfo(round);
      
      if (taskAccountDataJSON == null) {
        console.error('ERROR IN FETCHING TASK SUBMISSION DATA');
        return distributionList;
      }
      
      const submissions = taskAccountDataJSON.submissions[round];
      if (submissions == null) {
        console.log(`NO SUBMISSIONS FOUND IN ROUND ${round}`);
        return distributionList;
      }
      
      const taskStakeListJSON = await namespaceWrapper.getTaskState({
        is_stake_list_required: true,
      });
      
      if (taskStakeListJSON == null) {
        console.error('ERROR IN FETCHING TASK STAKING LIST');
        return distributionList;
      }
      
      const bountyPerRound = taskStakeListJSON.bounty_amount_per_round;
      const validSubmissions = Object.entries(submissions).filter(([_, value]) => parseInt(value) > 0);
      const rewardPerSubmission = Math.floor(bountyPerRound / validSubmissions.length);
      
      for (const [publicKey, value] of validSubmissions) {
        distributionList[publicKey] = rewardPerSubmission;
      }
      
      console.log('DISTRIBUTION LIST', distributionList);
      return distributionList;
    } catch (err) {
      console.log('ERROR IN GENERATING DISTRIBUTION LIST', err);
      return {};
    }
  }

  async validateDistribution(distributionListSubmitter, round, _dummyDistributionList, _dummyTaskState) {
    try {
      console.log('DISTRIBUTION LIST SUBMITTER', distributionListSubmitter);
      const rawDistributionList = await namespaceWrapper.getDistributionList(
        distributionListSubmitter,
        round,
      );
      let fetchedDistributionList = rawDistributionList ? JSON.parse(rawDistributionList) : null;
      console.log('FETCHED DISTRIBUTION LIST', fetchedDistributionList);
      
      const generateDistributionList = await this.generateDistributionList(round);

      if (Object.keys(generateDistributionList).length === 0) {
        console.log('UNABLE TO GENERATE DISTRIBUTION LIST');
        return true;
      }
      
      const result = this.shallowEqual(fetchedDistributionList, generateDistributionList);
      console.log('VALIDATION RESULT', result);
      return result;
    } catch (err) {
      console.log('ERROR IN VALIDATING DISTRIBUTION', err);
      return false;
    }
  }

  shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
}

const distribution = new Distribution();
module.exports = { distribution };