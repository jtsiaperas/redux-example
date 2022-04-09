const Dashboard = require('../models/Dashboard')

const Utility = (userId, res) => {
  const mesg = {}
  Dashboard.find({user: userId})
    .sort({date: 'descending'})
    .then(dashboard => {
      if(dashboard.length === 0){
        mesg.message = 'You dont have any events!'
        return res.status(200).json({mesg})
      } else if (!dashboard){
        mesg.message = 'Dashboard is not found!'
        return res.status(200).json({mesg})
      }
        return res.status(200).json({dashboard})
    })
    .catch(err => {
      mesg.error = err
      return res.status(200).json({mesg})
    })
}

module.exports = Utility