import UserModel from '../../db/models/user.schema'

export = {
    Query: {
        users: () => UserModel.find(),
        user: (_, {id}) => UserModel.findById((id))
    },
    Mutation: {
        createUser: (_, { name, email, password, permission }) => UserModel.create(
            {name, email, password, permission})
    }
};
