module.exports = (err, req, res, next) => {

    console.error("========== ERROR ==========");

    console.error("Request ID :", req.requestId);

    console.error("Stage      :", err.stage || "Unknown");

    console.error("Message    :", err.message);

    console.error("===========================");

    res.status(500).json({

        success: false,

        requestId: req.requestId,

        stage: err.stage || "Unknown",

        message: err.message

    });

};