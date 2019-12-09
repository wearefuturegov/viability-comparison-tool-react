import React from 'react'
import Button from './Button';


const ListButton = ({myList, setmyList, id, type}) => {
    var listArray = myList.split(',');

    function listClick(id) {
		if(myList) {			
			var index = listArray.indexOf(id);
			if (index !== -1) {
				listArray.splice(index, 1)
				setmyList(listArray.toString());
			} else {
				var tempString = listArray.toString() + ',' + id;
				setmyList(tempString);
			}
		} else {
			setmyList(id);
		}
	}

    return (
        <Button type={type + (listArray.indexOf(id) !== -1 ? ' delete' : '')} onClick={() => { listClick(id)}}> {listArray.indexOf(id) === -1 ? 'Add to my list' : 'Remove from list'} </Button>
    )
}

export default ListButton
