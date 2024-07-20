const { namespaceWrapper } = require('@_koii/namespace-wrapper');

class Audit {
  async validateNode(submission_value, round) {
    let vote;
    console.log('SUBMISSION VALUE', submission_value, round);
    try {
      // Verify that the submission is a number and within a reasonable range
      const numCasts = parseInt(submission_value);
      if (!isNaN(numCasts) && numCasts > 0 && numCasts <= 1000) {
        vote = true;
      } else {
        vote = false;
      }
    } catch (e) {
      console.error(e);
      vote = false;
    }
    return vote;
  }

  async auditTask(roundNumber) {
    console.log('AUDIT CALLED IN ROUND', roundNumber);
    console.log('CURRENT SLOT IN AUDIT', await namespaceWrapper.getSlot());
    await namespaceWrapper.validateAndVoteOnNodes(
      this.validateNode,
      roundNumber,
    );
  }
}

const audit = new Audit();
module.exports = { audit };