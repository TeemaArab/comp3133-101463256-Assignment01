
// const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList } = require('graphql');
// const { check } = require('express-validator');
// const mongoose = require('mongoose');
// const Employee = require('../models/Employee');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');

// // Define User Type
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLID },
//         username: { type: GraphQLString },
//         email: { type: GraphQLString }
//     })
// });

// // Define Employee Type
// const EmployeeType = new GraphQLObjectType({
//     name: 'Employee',
//     fields: () => ({
//         id: { type: GraphQLID },
//         first_name: { type: GraphQLString },
//         last_name: { type: GraphQLString },
//         email: { type: GraphQLString },
//         gender: { type: GraphQLString },
//         designation: { type: GraphQLString },
//         salary: { type: GraphQLFloat },
//         date_of_joining: { type: GraphQLString },
//         department: { type: GraphQLString },
//         employee_photo: { type: GraphQLString }
//     })
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         getAllEmployees: {
//             type: new GraphQLList(EmployeeType),
//             resolve: async () => {
//                 return Employee.find();
//             }
//         },
//         getEmployeeById: {
//             type: EmployeeType,
//             args: { eid: { type: GraphQLID } },
//             resolve: async (_, args) => {
//                 return Employee.findById(args.eid);
//             }
//         },
//         searchEmployeesByDeptOrDesignation: {
//             type: new GraphQLList(EmployeeType),
//             args: {
//                 department: { type: GraphQLString },
//                 designation: { type: GraphQLString }
//             },
//             resolve: async (_, args) => {
//                 let query = {};
//                 if (args.department) query.department = args.department;
//                 if (args.designation) query.designation = args.designation;
//                 return Employee.find(query);
//             }
//         },
//         login: {
//             type: GraphQLString,
//             args: {
//                 username: { type: GraphQLString },
//                 password: { type: GraphQLString }
//             },
//             resolve: async (_, args) => {
//                 const user = await User.findOne({ username: args.username });
//                 if (!user) return "User not found!";
//                 if (args.password !== user.password) return "Invalid password!";
//                 return "Login successful!";
//             }
//         }
//     }
// });

// // Mutations
// // const Mutation = new GraphQLObjectType({
// //     name: 'Mutation',
// //     fields: {
// //         signup: {
// //             type: UserType,
// //             args: {
// //                 username: { type: GraphQLString },
// //                 email: { type: GraphQLString },
// //                 password: { type: GraphQLString }
// //             },
// //             resolve: async (_, args) => {
// //                 // Validation
// //                 if (!args.username || !args.email || !args.password) {
// //                     throw new Error("All fields are required.");
// //                 }
// //                 if (!args.email.includes("@")) {
// //                     throw new Error("Invalid email format.");
// //                 }
// //                 if (args.password.length < 6) {
// //                     throw new Error("Password must be at least 6 characters.");
// //                 }

// //                 // Save User
// //                 const user = new User(args);
// //                 return user.save();
// //             }
// //         },

//         const Mutation = new GraphQLObjectType({
//             name: 'Mutation',
//             fields: {
//                 signup: {
//                     type: UserType,
//                     args: {
//                         username: { type: GraphQLString },
//                         email: { type: GraphQLString },
//                         password: { type: GraphQLString }
//                     },
//                     resolve: async (_, args) => {
//                         // Validation
//                         if (!args.username || !args.email || !args.password) {
//                             throw new Error("All fields are required.");
//                         }
//                         if (!args.email.includes("@")) {
//                             throw new Error("Invalid email format.");
//                         }
//                         if (args.password.length < 6) {
//                             throw new Error("Password must be at least 6 characters.");
//                         }
        
//                         // ✅ Hash the password before saving
//                         const hashedPassword = await bcrypt.hash(args.password, 10);
        
//                         // ✅ Save User with hashed password
//                         const user = new User({
//                             username: args.username,
//                             email: args.email,
//                             password: hashedPassword
//                         });
        
//                         return user.save();
//                     }
//                 }
//             }
//         });




//         addEmployee: {
//             type: EmployeeType,
//             args: {
//                 first_name: { type: GraphQLString },
//                 last_name: { type: GraphQLString },
//                 email: { type: GraphQLString },
//                 gender: { type: GraphQLString },
//                 designation: { type: GraphQLString },
//                 salary: { type: GraphQLFloat },
//                 date_of_joining: { type: GraphQLString },
//                 department: { type: GraphQLString },
//                 employee_photo: { type: GraphQLString }
//             },
//             resolve: async (_, args) => {
//                 // Validation
//                 if (!args.first_name || !args.last_name || !args.email || !args.designation || !args.salary || !args.department) {
//                     throw new Error("All fields are required.");
//                 }
//                 if (!args.email.includes("@")) {
//                     throw new Error("Invalid email format.");
//                 }
//                 if (args.salary < 1000) {
//                     throw new Error("Salary must be at least 1000.");
//                 }

//                 // Save Employee
//                 const employee = new Employee(args);
//                 return employee.save();
//             }
//         },
//         updateEmployee: {
//             type: EmployeeType,
//             args: {
//                 eid: { type: GraphQLID },
//                 first_name: { type: GraphQLString },
//                 last_name: { type: GraphQLString },
//                 email: { type: GraphQLString },
//                 gender: { type: GraphQLString },
//                 designation: { type: GraphQLString },
//                 salary: { type: GraphQLFloat },
//                 date_of_joining: { type: GraphQLString },
//                 department: { type: GraphQLString },
//                 employee_photo: { type: GraphQLString }
//             },
//             resolve: async (_, args) => {
//                 // Validation
//                 if (!args.eid) {
//                     throw new Error("Employee ID is required.");
//                 }
//                 if (args.email && !args.email.includes("@")) {
//                     throw new Error("Invalid email format.");
//                 }
//                 if (args.salary && args.salary < 1000) {
//                     throw new Error("Salary must be at least 1000.");
//                 }

//                 // Update Employee
//                 return Employee.findByIdAndUpdate(args.eid, { $set: args }, { new: true });
//             }
//         },
//         deleteEmployee: {
//             type: GraphQLString,
//             args: {
//                 eid: { type: GraphQLID }
//             },
//             resolve: async (_, args) => {
//                 const employee = await Employee.findByIdAndDelete(args.eid);
//                 if (!employee) return "Employee not found!";
//                 return "Employee deleted successfully";
//             }
//         }
//     }
// });

// // Export Schema
// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// });

//-----------------------------------------------------
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const User = require('../models/User');

// Define User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// Define Employee Type
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllEmployees: {
            type: new GraphQLList(EmployeeType),
            resolve: async () => Employee.find()
        },
        getEmployeeById: {
            type: EmployeeType,
            args: { eid: { type: GraphQLID } },
            resolve: async (_, args) => Employee.findById(args.eid)
        },
        searchEmployeesByDeptOrDesignation: {
            type: new GraphQLList(EmployeeType),
            args: {
                department: { type: GraphQLString },
                designation: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                let query = {};
                if (args.department) query.department = args.department;
                if (args.designation) query.designation = args.designation;
                return Employee.find(query);
            }
        },
        login: {
            type: GraphQLString,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                const user = await User.findOne({ username: args.username });
                if (!user) return "User not found!";

                // Compare password with the hashed password in the database
                const isMatch = await bcrypt.compare(args.password, user.password);
                if (!isMatch) return "Invalid password!";

                return "Login successful!";
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                // Validation
                if (!args.username || !args.email || !args.password) {
                    throw new Error("All fields are required.");
                }
                if (!args.email.includes("@")) {
                    throw new Error("Invalid email format.");
                }
                if (args.password.length < 6) {
                    throw new Error("Password must be at least 6 characters.");
                }

                // ✅ Hash the password before saving
                const hashedPassword = await bcrypt.hash(args.password, 10);

                // ✅ Save User with hashed password
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword
                });

                return user.save();
            }
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                salary: { type: GraphQLFloat },
                date_of_joining: { type: GraphQLString },
                department: { type: GraphQLString },
                employee_photo: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                // Validation
                if (!args.first_name || !args.last_name || !args.email || !args.designation || !args.salary || !args.department) {
                    throw new Error("All fields are required.");
                }
                if (!args.email.includes("@")) {
                    throw new Error("Invalid email format.");
                }
                if (args.salary < 1000) {
                    throw new Error("Salary must be at least 1000.");
                }

                // Save Employee
                const employee = new Employee(args);
                return employee.save();
            }
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                eid: { type: GraphQLID },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                salary: { type: GraphQLFloat },
                date_of_joining: { type: GraphQLString },
                department: { type: GraphQLString },
                employee_photo: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                // Validation
                if (!args.eid) {
                    throw new Error("Employee ID is required.");
                }
                if (args.email && !args.email.includes("@")) {
                    throw new Error("Invalid email format.");
                }
                if (args.salary && args.salary < 1000) {
                    throw new Error("Salary must be at least 1000.");
                }

                // Update Employee
                return Employee.findByIdAndUpdate(args.eid, { $set: args }, { new: true });
            }
        },
        deleteEmployee: {
            type: GraphQLString,
            args: {
                eid: { type: GraphQLID }
            },
            resolve: async (_, args) => {
                const employee = await Employee.findByIdAndDelete(args.eid);
                if (!employee) return "Employee not found!";
                return "Employee deleted successfully";
            }
        }
    }
});

// Export Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

