'use client'
import React from 'react'
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from './ui/dialog'
import {ImSpinner2} from "react-icons/im";
import {BsFileEarmarkPlus} from "react-icons/bs"
import { Button } from 'react-day-picker';



function CreateFormBtn() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Create new form</Button>
        </DialogTrigger>

        <DialogContent>
        <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
                Create a new form to start collecting response
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CreateFormBtn