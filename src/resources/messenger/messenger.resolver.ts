import MessengerModel, {IMessenger} from '../../db/models/message.schema'

export = {
    Query: {
        user_message_to_bot: async (_, {_id, message}) => {
            await save_message(_id, message);
            let x = MessengerModel.findById(_id)
            return x
        },
        get_user_messages: (_, {_id}) => MessengerModel.findById((_id))
    },
};


async function save_message(_id, message) {
    await MessengerModel.findOneAndUpdate(
        {_id: _id},
        {$push: {messages: {user: message, time: new Date().getTime()}}})
        .then(res => {
            if (res === null) MessengerModel.create({
                _id: _id,
                messages: [{user: message, time: new Date().getTime()}]
            }).then()
        })
        .catch(res => console.log("CATCH:" + res))
}
