# Backend REST API reference

## Endpoints

### `/new` `POST`
Creates a new game
#### Params
`size`: The size of the board

#### Status
`400` if no `size` is provided

`200` otherwise

####


### `/board` `GET`
Creates a new game
#### Params
`board`: The created game board

#### Status
`400` if `board` hasn't been created

`200` otherwise


### `/click` `POST`
Creates a new game
#### Params
`x`: The x coordinate of the board where tile is clicked

`y`: The y coordinate of the board where tile is clicked

#### Status
`400` if no `x` or `y` is provided

`403` if  a basin is hit

`200` otherwise




