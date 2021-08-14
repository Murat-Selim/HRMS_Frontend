import { toast } from "react-toastify";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions/favoriteActions";
import { favorites } from "../initialValues/favorites";

const initialState = {
    favorites:favorites
}

export default function favoritesReducer(state=initialState, {type,payload} ) {
    
    switch (type) {

        case ADD_TO_FAVORITES:
            let jobAdvert = state.favorites.find(j=>j.jobAdvert.id === payload.id)
            if (jobAdvert) {
                toast.success("Bu ilan zaten favorilere eklenmiş!");
                return {
                    ...state
                }
            }
            else{
                toast.success("Favorilere ekleme işlemi başarılı!")
                return {
                    ...state,
                    favorites: [...state.favorites, {jobAdvert:payload}]
                    
                }
            }

        case REMOVE_FROM_FAVORITES:
                return{
                    ...state,
                    favorites: [...state.favorites.filter(favorite=>favorite.id !== payload)]
                }
        
        default:
            return state;
    }
}