// @desc Add a new course
// @route POST /api/v1/courses
// @access PUBLIC
export const addCourse = async (req, res) => {
    res
        .status(201)
        .json({
            success: true,
            statusCode: 201,
            message: 'Course created successfully',
        });
};
// @desc READ/ Search all course
// @route GET /api/v1/courses
// @access PUBLIC
export const getCourses = async (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            statusCode: 200,
            message: 'Courses fetched successfully',
        });
};
// @desc READ/ Search a course
// @route GET /api/v1/courses/:id
// @access PUBLIC
export const getCourse = async (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            statusCode: 200,
            message: `Course with id: ${req.params.id} fetched successfully`,
        });
};

// @desc Update a course
// @route PUT /api/v1/courses
// @access PUBLIC
export const updateCourse = async (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            statusCode: 200,
            message: `Course with id: ${req.params.id} updated successfully`,
        });
};

// @desc Delete a course
// @route DELETE /api/v1/courses
// @access PUBLIC
export const deleteCourse = async (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            statusCode: 200,
            message: `Course with id: ${req.params.id} deleted successfully`,
        });
};

