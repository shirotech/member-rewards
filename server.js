const express = require('express');
const debug = require('debug')('member-rewards:server');

const app = express();
app.use(require('body-parser').json());

const conf = require('./env/conf');
const member = require('./model/member');
const reward = require('./model/reward');

app.route('/member/:id?')
  .get((req, res) => member
    .get(req.params.id, reward)
    .then(res.send.bind(res))
    .catch(res.sendStatus.bind(res))
  )
  .post((req, res) => member
    .create(req.body.first_name, req.body.surname, req.body.dob)
    .then(res.send.bind(res))
    .catch(res.sendStatus.bind(res))
  )
  .delete((req, res) => member
    .remove(req.params.id)
    .then(res.sendStatus.bind(res))
    .catch(res.sendStatus.bind(res))
  );

// create reward points, but member is unknown
app.post('/reward/:points', (req, res) => reward
  .add(req.params.points)
  .then(res.send.bind(res))
  .catch(res.sendStatus.bind(res))
);

// create reward with known member
app.put('/reward/:points/member/:member_id', (req, res) => reward
  .add(req.params.points, req.params.member_id)
  .then(res.send.bind(res))
  .catch(res.sendStatus.bind(res))
);

// remove reward
app.delete('/reward/:id', (req, res) => reward
  .remove(req.params.id, req.params.member_id)
  .then(res.sendStatus.bind(res))
  .catch(res.sendStatus.bind(res))
);

// associate reward to member
app.put('/reward/:id/associate/member/:member_id', (req, res) => reward
  .associate(req.params.id, req.params.member_id)
  .then(res.sendStatus.bind(res))
  .catch(res.sendStatus.bind(res))
);

app.listen(conf.port, () => {
  debug('Server started on port %d', conf.port);
});