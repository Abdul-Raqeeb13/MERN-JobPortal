const mongoose = require("mongoose");

// const pdfDetailedSchema = new mongoose.Schema({
//     pdf: {
//         type: String,
//         required: true
//     }
// }, {
//     collection: "PdfDetails" // Define the actual collection name here
// });

// module.exports = mongoose.model("PdfDetails", pdfDetailedSchema);


const pdfDetailsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pdf: { type: String, required: true }
});
module.exports = mongoose.model("PdfDetails", pdfDetailsSchema);
