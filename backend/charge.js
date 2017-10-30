var stripe = require('stripe');

module.exports = function (ctx, req, res) {

    stripe(ctx.secrets.stripeSecretKey).charges.create({
        amount: ctx.data.amount,
        currency: ctx.data.currency,
        source: ctx.data.token,
        description: 'Test stripe'
    }, function (error, charge) {
        var status = error ? 400 : 200;
        var message = error ? error.message : 'Test stripe';
        res.writeHead(status, { 'Content-Type': 'application/json' });
        var json = JSON.stringify({
            charge : charge
        })
        return res.end(json);
    });
};