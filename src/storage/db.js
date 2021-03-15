const MongoClient = require('mongodb')

function Database() {
    if (!new.target) {
        return new Database()
    }

    let db = null
    let client = null

    this.connect = async (config) => {
        try {
            client = await MongoClient.connect(config.url, config.options)
            db = client.db(config.name)

            if (!db) {
                console.error('Cant establish mongo connection reason: null client')
                throw (e)
            }

            console.info('DB connection established')

        } catch (e) {
            throw (e)
        }
    }

    this.disconnect = () => {
        client.close()
    }

    process.on('SIGTERM', () => {
        client.close()
    })

    this.insert = async (name, content) => {
        const collection = db.collection(name)
        return collection.updateOne({ email: content.email }, { $set: { rss: content.rss } }, { upsert: true })
    }

    this.find = async (name, item) => {
        const collection = db.collection(name)
        return collection.findOne({}, { email: item })
    }

    this.update = async (name, oldContent, newContent) => {
        const collection = db.collection(name)
        return collection.updateOne(oldContent, newContent)
    }

    this.remove = async (name, content) => {
        const collection = db.collection(name)
        return collection.deleteOne(content)
    }

    this.drop = async (name) => {
        const collection = db.collection(name)
        return collection.drop()
    }
}

module.exports = Database