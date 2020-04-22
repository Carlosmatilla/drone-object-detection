import { socketIo } from '../socket-io'

const speed = 80

export function handleKeyDown(event) {
    console.log(event.key)

    switch (event.key) {
        case 'w':
            socketIo.emit('control', `rc 0 ${speed} 0 0`)
            break
        case 'a':
            socketIo.emit('control', `rc -${speed} 0 0 0`)
            break
        case 's':
            socketIo.emit('control', `rc 0 -${speed} 0 0`)
            break
        case 'd':
            socketIo.emit('control', `rc ${speed} 0 0 0`)
            break
        case 'ArrowUp':
            socketIo.emit('control', `rc 0 0 ${speed} 0`)
            break
        case 'ArrowLeft':
            socketIo.emit('control', `rc 0 0 0 -${speed}`)
            break
        case 'ArrowRight':
            socketIo.emit('control', `rc 0 0 0 ${speed}`)
            break
        case 'ArrowDown':
            socketIo.emit('control', `rc 0 0 -${speed} 0`)
            break
        case 'Enter':
            socketIo.emit('control', `takeoff`)
            break
        case 'Escape':
            socketIo.emit('control', `land`)
            break
        default:
    }
}

export function handleKeyUp(event) {
    if (event.key === 'w' || 'a' || 's' || 'd' || 'ArrowUp' || 'ArrowLeft' || 'ArrowRight' || 'ArrowDown') socketIo.emit('control', `rc 0 0 0 0`)
}