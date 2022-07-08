const router = require('express').Router();
const {ObjectId} = require('mongoose').Types;
const User = require('../../models/user');


router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const user = await User.aggregate([
            {
                $match: {
                    _id: ObjectId(userId)
                }
            },
            {
                $project: {
                    readBooks: 1, 
                    _id: 0
                }
            },
            {
                $unwind: "$readBooks"
            },
            {
                $project: {
                    book: '$readBooks.book',
                    type: "$readBooks.type",
                    currentPage: "$readBooks.currentPage",
                    updatedAt: "$readBooks.updatedAt",
                    _id: 0
                }
            },
            {
                $sort: {
                    updatedAt: -1
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'book',
                    
                }
            },
            {
                $project: {
                    type: 1,
                    currentPage: 1,
                    updatedAt: 1,
                    name: { $first: '$book.name'},
                    image: { $first: '$book.image'},
                    writer: { $first: '$book.writer'},
                    totalPage: { $first: '$book.page'},             
                }
            },
            {
                $lookup: {
                    from: "authors",
                    localField: "writer",
                    foreignField: "_id",
                    as: "writer"
                }
            },
            {
                $project: {
                    type: 1,
                    currentPage: 1,
                    updatedAt: 1,
                    name: 1,
                    image: 1,
                    totalPage: 1,   
                    writerName: { $first: '$writer.name'},          
                }
            }
        ]);

        res.json({
            message: 'User data',
            data: {
                currentlyReading: user
            }
        })
    }
    catch( error ) {
        next(error);
    }
});

module.exports = router;