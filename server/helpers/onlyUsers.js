const onlyUsers = (req, res, next) => {
    if (req.session.name) {

        next()
    } else {
        res.status(401).send({ err: "sorry, you should login first" })
    }
}

module.exports = onlyUsers