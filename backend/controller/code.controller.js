const Code = require("../model/Code");

exports.postCode = async (req, res) => {
    try {
        const { code } = req.body;

        const leng = await Code.find()

        if (leng.length > 0) {
             var cod = await Code.findByIdAndUpdate(
                leng[0],
                {
                    code
                },
                {new: true}
             )
        } else {
            var cod = new Code({
                code
            })

            await cod.save();
        }

        return res.status(200).json({
            message: "Code updated successfully",
        });

    } catch (error) {

    }
}

exports.getCode = async (req, res) => {
    try {
        const code = await Code.find();

        return res.status(200).json({
            data: code,
            message: "Code fetched successfully",
        });
    } catch (error) {

    }
}