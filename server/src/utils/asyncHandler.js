const asyncHandler = ( requestHandler ) => {
    (req, res, nexr) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }
}



export {asyncHandler}

//method 2
// const asyncHandler = (fn) => async (req, res, next) {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }