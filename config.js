var path = require('path');

exports.meta = {
    title: 'Order online @ Gluten-Free with Sarah B',
    slogan: 'Now delivering throughout the Triangle!'
};

exports.session = {
    password: 'i should probably set this to something s3cure',
    cookie: 's',
    expiresIn: 14 * 24 * 60 * 60 * 1000 // 2 weeks
};

exports.server = {
    views: {
        engines: {
            jade: require('jade')
        },
        partialsPath: path.resolve(__dirname, 'views')
    }
};
