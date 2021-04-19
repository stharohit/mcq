const { Tests } = require("../modal/test.modal");
const { Question, QuestionOption } = require("../modal/question.modal");
const { Reports, ReportOfUser } = require("../modal/reports.modal");

const createTests = (req, res) => {
    const { name, description } = req.body;
    try {
        Tests.create({
            name,
            description
        }).then((test) => {
            return res.status(200).json({
                success: true,
                message: 'Successfully created new test.'
            })
        })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getTests = (req, res) => {

    try {
        Tests.findAll({
            attributes: ['id', 'name', 'description', 'isAvailable'],
            include: [{
                model: Question,
                as: "question",
                attributes: ['id', 'question'],
                required: false,
                include: [{
                    association: QuestionOption,
                    attributes: ['id', 'option'],
                    required: false,
                }]
            }]
        }).then((tests) => {
            return res.status(200).json({
                success: true,
                tests: tests
            })
        })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getUserTests = (req, res) => {

    try {
        Tests.findAll({
            attributes: ['id', 'name', 'description'],
            where: {
                isAvailable: true
            },
            include: [{
                model: Question,
                as: "question",
                attributes: ['id', 'question'],
                required: false,
                include: [{
                    association: QuestionOption,
                    attributes: ['id', 'option'],
                    required: false,
                }]
            }]
        }).then((tests) => {
            return res.status(200).json({
                success: true,
                tests: tests
            })
        })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const addMCQToTests = (req, res) => {
    const { mcqs, TestId } = req.body;
    const currentMCQs = mcqs.map(mcq => {
        mcq.TestId = TestId;
        return mcq;
    })

    try {
        Question.bulkCreate(currentMCQs, { include: QuestionOption}).then((test) => {
            Tests.update({
                isAvailable: true
            }, {
                where: {
                    id: TestId
                }
            });
            return res.status(200).json({
                success: true,
                message: 'MCQ successfully added!'
            })
        })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const takeTests = async (req, res) => {
    const { testId, tests } = req.body;
    const data = await Tests.findByPk(testId);
    if (!data.isAvailable) {
        return res.status(404).json({
            success: false,
            message: 'Tests not found'
        })
    }
    try {
        const testsQuestion = await Tests.findOne({
            where: {
                id: testId
            },
            include: [{
                model: Question,
                as: "question",
                attributes: ['id'],
                required: false,
                include: {
                    association: QuestionOption,
                    attributes: ['id'],
                    where: {
                        isCorrect: true
                    },
                    required: false,
                }
            }]
        });
        let count = 0;
        testsQuestion.question.forEach(async (que) => {
            const filter = tests.filter(test => test.questionId === que.id);
            if (filter[0].answer === que.options[0].id) {
                count++;
            } else {
                count--;
            }
        });

        const percentage = (count / tests.length) * 100;
        let isPassed = false;

        if (percentage >= 50) {
            isPassed = true;
        }

        Reports.create({
            isPassed,
            testId,
            userId: req.token.id
        }).then((data) => {
                return res.status(200).json(data);
            }).catch((error) => {
                return res.status(500).json({
                    success: false,
                    error: error.message
                })
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getReports = (req, res) => {
    try {
        Reports.findAll({
            attributes: ['id', 'isPassed', 'testId'],
            include: [{
                association: ReportOfUser,
                attributes: ['firstName', 'lastName', 'email'],
                required: false,
                as: 'user'
            }]
        }).then((reports) => {
                return res.status(200).json({
                    success: true,
                    reports
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const passedReports = (req, res) => {
    try {
        Reports.findAll({
            attributes: ['id', 'isPassed', 'testId'],
            where: {
                isPassed: true
            },
            include: [{
                association: ReportOfUser,
                attributes: ['firstName', 'lastName', 'email'],
                required: false,
                as: 'user'
            }]
        }).then((reports) => {
                return res.status(200).json({
                    success: true,
                    reports
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const failedReports = (req, res) => {
    try {
        Reports.findAll({
            attributes: ['id', 'isPassed', 'testId'],
            where: {
                isPassed: false
            },
            include: [{
                association: ReportOfUser,
                attributes: ['firstName', 'lastName', 'email'],
                required: false,
                as: 'user'
            }]
        }).then((reports) => {
                return res.status(200).json({
                    success: true,
                    reports
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getUserReports = (req, res) => {
    const { mcqs } = req.body;

    try {
        Question.bulkCreate(mcqs, {include: QuestionOption}).then((test) => {
                return res.status(200).json({
                    success: true,
                    message: 'MCQ successfully added!'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false,
                    error: error.message
                });
            })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    getTests,
    createTests,
    addMCQToTests,
    takeTests,
    getReports,
    getUserReports,
    passedReports,
    failedReports,
    getUserTests
}