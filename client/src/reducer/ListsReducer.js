import { useState, useEffect, createContext, useReducer, useContext } from "react";
import { useLists } from "../context/ListsContext";

export const ListsReducer = createContext(null);

export function ListsReducerProvider({ children }) {
    
    const initLists = useLists();
    const [lists, dispatch] = useReducer(listsReducer, initLists);

    console.log(lists)
    return (
        <ListsReducer.Provider value={dispatch}>
            {children}
        </ListsReducer.Provider>
    )

}

export function useListsDispatch() {
    return useContext(ListsReducer);
}

function listsReducer(lists, action) {
    switch (action.type) {
        case 'added': {
            return [...lists, {
                list_id: action.list_id,
                name: action.name,
                is_deleted: action.is_deleted
            }];
        }
        case 'changed': {
            return lists.map(l => {
                if (l.list_id === action.list.list_id) {
                    return action.list;
                } else {
                    return l;
                }
            })
        }
        case 'deleted': {
            return lists.filter(l => l.list_id !== action.list_id)
        }
        default: {
            throw Error('unknown action: ' + action.type)
        }
    }
}


