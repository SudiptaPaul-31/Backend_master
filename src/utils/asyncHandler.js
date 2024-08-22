const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandeler(req, res, next)).catch((err) => next(err));
    }
}


export {asyncHandler} 
