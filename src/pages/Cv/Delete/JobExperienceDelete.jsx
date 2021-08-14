import React from 'react'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import JobExperienceService from "../../../services/jobExperienceService"

export default function JobExperienceDelete({jobExperience}) {

    function deleteJobExperience() {
        let jobExperienceService = new JobExperienceService()
        jobExperienceService.delete(jobExperience.id).then(result => result.data.data)
        toast.error("İş Tecrübesi silindi")
    }

    return (
        <div>
            <Button size="mini" onClick={() => deleteJobExperience()} color="red" icon="trash alternate outline"></Button>
        </div>
    )
}
