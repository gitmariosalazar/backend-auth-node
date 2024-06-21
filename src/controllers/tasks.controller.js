import Task from "../models/task.model.js"

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id}).populate("user");

        if (tasks && tasks.length > 0) {
            return res.json({error: null, task: tasks, message: 'Tasks found successfully'});
        } else {
            return res.json({error: null, task: tasks, message: 'Tasks for user logged is empty!'});
        }
    } catch (error) {
        console.log('Error occurred:', error.message);
        return res.status(500).json({error: error.message, message: "Error ocurred!", task: null});
    }
};


export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if (!task) {
            return res.status(404).json({error: null, task: task, message: 'Task not found'})
        }
        res.json({error: null, task: task, message: 'Task was found successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message, task: null, message: 'Get task failed'})
    }
}
export const createTask = async (req, res) => {
    try {
        console.log(req.user.id)
        const {title, description, date} = req.body
        const task = new Task({title, description, date, user: req.user.id})
        const saveTask = await task.save()
        res.json({error: null, task: saveTask, message: 'Create task successfully'})

    } catch (error) {
        return res.status(500).json({error: error.message, task: null, message: 'Create task failed'})

    }
}


export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!task) {
            return res.status(404).json({error: null, task: task, message: 'Task not found'})
        }
        res.json({error: null, task: task, message: 'Task updated successfully!'})

    } catch (error) {
        return res.status(500).json({error: error.message, task: null, message: 'Task updated successfully!'})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({error: null, task: task, message: 'Task not found'})
        }
        res.json({error: null, task: null, message: 'Task delete successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message, task: null, message: 'Task delete error'})
    }
}