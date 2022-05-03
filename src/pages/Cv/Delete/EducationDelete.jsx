import React from 'react'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import EducationService from "../../../services/educationService"

export default function EducationDelete({education}) {

    function deleteEducation() {
        let educationService = new EducationService()
        educationService.delete(education.id).then(result=>result.data.data)
        toast.error("Okul bilgisi silindi")
        window.location.reload(2000)
    }

    return (
        <div>
            <Button size="mini" onClick={()=>deleteEducation()} color="red" icon="trash alternate outline"></Button>
        </div>
    )
}
