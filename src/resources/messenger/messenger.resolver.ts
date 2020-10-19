import MessengerModel, {IMessenger} from '../../db/models/message.schema'
const axios = require('axios');


export = {
    Query: {
        user_message_to_bot: async (_, {_id, message}) => {
            let response = await predict_machine_learning(message);
            save_message(_id, message);
            save_message(_id, response.message)
            return {message: response.message, _id: "BOT"};
        },
        get_user_messages: (_, {_id}) => MessengerModel.findById((_id))
    },
};

async function call_bot() {
    return "Oi !"
}

let predict_machine_learning = async (message) => {
    let config = {
        method: 'post',
        url: process.env.PYTHON + 'predict',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "message": regularizeSentence(message) // Pre processing feature engineering
        }
    };

    return await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return {
                "status": "Python offline",
                "error": error
            }
        });
}


function save_message(_id, message) {
    MessengerModel.findOneAndUpdate(
        {_id: _id},
        {$push: {messages: {user: message, time: new Date().getTime()}}})
        .then(res => {
            // If chat does not exist
            if (!res) MessengerModel.create({
                _id: _id,
                messages: [{user: message, time: new Date().getTime()}]
            }).then()

            })
        .catch(res => console.log("CATCH:" + res))
}
//Put accent out
const regularizeSentence = (text) => {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace(new RegExp('[?!.[{};/,]','gi'), '');
    return text.trim();
};
