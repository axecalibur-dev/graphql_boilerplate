const { Student } = require("./models/Student.js");
const mongoose = require("mongoose").default;
const resolvers = {
    Query: {
        hello: () => "GraphQL is Awesome",
        welcome: (parent, params) => `Hello ${params.name}`,
        students: async () => await Student.find({}),
        student:async (parent , args) => await Student.findById(args.id)
},
Mutation: {
    create: async (parent, args) => {
        const { firstName, lastName, age } = args;
        const newStudent = new Student({
            firstName,
            lastName,
            age,
        });
        await newStudent.save();
        return newStudent;
    },

    update: async (parent , args) => {
        const {id} = args;
        return await Student.findByIdAndUpdate(id , args , {
            new : true
        })
    },

    delete : async (parent, args) => {
        const {id} = args;

        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return {
                success: false,
                message: "Student with ID not found.",
                // deletedStudent: null
            };
        }

        return {
            success: true,
            message: "Student successfully deleted.",
            // deletedStudent: deletedStudent
        };
    }


},
};

module.exports = { resolvers };