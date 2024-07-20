const { namespaceWrapper } = require('@_koii/namespace-wrapper');
const axios = require('axios');

class Submission {
  async task(round) {
    try {
      console.log('ROUND', round);
      
      // Fetch latest content from Warpcast API
      const response = await axios.get('https://api.warpcast.com/v2/latest-casts');
      const latestCasts = response.data.casts;
      
      // Store the fetched data in NeDB
      await namespaceWrapper.storeSet('latestCasts', JSON.stringify(latestCasts));
      
      // Return the number of casts fetched
      return latestCasts.length.toString();
    } catch (err) {
      console.log('ERROR IN EXECUTING TASK', err);
      return 'ERROR IN EXECUTING TASK: ' + err.message;
    }
  }

  async submitTask(round) {
    console.log('SUBMIT TASK CALLED ROUND NUMBER', round);
    try {
      console.log('SUBMIT TASK SLOT', await namespaceWrapper.getSlot());
      const submission = await this.fetchSubmission(round);
      console.log('SUBMISSION', submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(submission, round);
      console.log('SUBMISSION CHECKED AND ROUND UPDATED');
      return submission;
    } catch (error) {
      console.log('ERROR IN SUBMISSION', error);
    }
  }

  async fetchSubmission(round) {
    console.log('FETCH SUBMISSION');
    const latestCasts = await namespaceWrapper.storeGet('latestCasts');
    return latestCasts ? JSON.parse(latestCasts).length.toString() : '0';
  }
}

const submission = new Submission();
module.exports = { submission };