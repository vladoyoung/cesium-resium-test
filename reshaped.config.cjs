const { generateThemeColors } = require("reshaped/themes");

const colors = generateThemeColors({ primary: "#ff0000" });

const config = {
    themes: {
        new: {
            color: colors
        },
    },
};

module.exports = config;