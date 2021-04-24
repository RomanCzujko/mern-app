import { useCallback } from 'react'

export const useMessage = () => {
   return useCallback((messageText) => {
    if(window.M && messageText){
        window.M.toast({html: messageText})
    }
   }, [])
    
}
 