

function Item({name}){
    return (
        <div>
        <h1>Item {name}</h1>
        </div>
    )
    
}

const Items = () => {

  return (
    <div>
        <Item name='mo'/>
    </div>
  )
}

export default Items