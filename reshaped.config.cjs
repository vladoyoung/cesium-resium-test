const { generateThemeColors } = require("reshaped/themes");

const colors = generateThemeColors({ primary: "#5371F4" });

const config = {
    themes: {
        myxMain: {
            color: colors
        },
    },
};

module.exports = config;