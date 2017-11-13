class user {
    constructor(users){
        this._users = users;
    }

    set users(users){
        this._users = users;
    }

    get users(){
        return this._users;
    }

    get nextId(){
        return this._users.length + 1;
    }

    getUser(id){
        let user = {};

        for(let i=0; i < this._users.length; i++){
            if(this._users[i].id === id){
                user = this._users[i];
                break;
            }
        }

        return user;
    }

    getUserIndex(id){
        let index = -1;

        for(let i=0; i < this._users.length; i++){
            if(this._users[i].id === id){
                index = i;
                break;
            }
        }

        return index;
    }

    postUser(user){
        user.id = this.nextId;
        
        this._users.push(user);
    }

    patchUser(user){
        let index = this.getUserIndex(user.id);
        this._users[index] = user;
    }
}

module.exports.user = user;