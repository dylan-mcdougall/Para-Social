export const separatedRooms = (arr) => {
    const rooms = arr.slice()
    const pinnedRooms = [];
    for (let i = 0; i < rooms.length; i++) {
        console.log(rooms[i])
        if (rooms[i].classification === 'about' || rooms[i].classification === 'announcement') {
            pinnedRooms.push(rooms[i]);
            rooms.splice(i, 1);
            i--;
        }
    }
    return { pinnedRooms, rooms }
}
