
exports.loginWithSSO = async(req, res) => {
    res.json({
        data: process.env.DATABASE,
        ok: true
    });
}