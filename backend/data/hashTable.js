
export class Music {
    size;
    array;
    constructor () {
        this.array = []
        this.size = 0
    }
    setList ( list_song , size) {
        const listSong = list_song 
        this.size = size
        listSong.forEach((song) => {
            const number = this.stringToNumber(song.id)
            console.log(typeof song.id)
            let index = this.hashFunc(number, this.size)
            let j = 0 
            while (j < this.size) {
                if (this.array[index] === undefined) {
                    this.array[index] = song
                    break
                }
                else {
                    j++
                    index = this.hashFuncAgain(number, this.size, j)
                }
            }
        })
        console.log(this.array)
    }
    getSong(id) {
        const number = this.stringToNumber(id)
        let index = this.hashFunc(number, this.size) 
        let j = 0
        while(j < this.size) {
            if (this.array[index].id === id) {
                return this.array[index]
            }
            else {
                j++
                index = this.hashFuncAgain(number, this.size, j)
            }
        }
        if (j === this.size) {
            console.log("Không tìm thấy!")
        }
    }
    stringToNumber(str) { //string -> number
        return str.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    }
    hashFunc (number, sizeofArray) {
        return number % sizeofArray
    }
    hashFuncAgain (number, sizeofArray, j) {
        return (number + j) % sizeofArray
    }
}