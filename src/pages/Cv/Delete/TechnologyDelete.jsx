import React from 'react'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import TechnologyService from '../../../services/technologyService'

export default function TechnologyDelete({technology}) {

    function deleteTechnology() {
        let technologyService = new TechnologyService()
        technologyService.delete(technology.id).then(result => result.data.data)
        toast.error(`${technology.techName} silindi`)
        window.location.reload(2000)
    }

    return (
        <div>
            <Button size="mini" onClick={() => deleteTechnology()} color="red" icon="trash alternate outline"></Button>
        </div>
    )
}

