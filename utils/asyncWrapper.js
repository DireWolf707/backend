import { validationResult } from 'express-validator';

export default (fn) => {
    return (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array(),
                status: 'fail'
            });
        }
        fn(req,res,next).catch(next);
    }
}