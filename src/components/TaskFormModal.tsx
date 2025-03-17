import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { useState } from "react"


export function TaskFormModal({ handleSubmit}: any) {

    const [open, setOpen] = useState(false)

    const [data, setData] = useState({
        name: '',
        description: '',
    })


    const getData: any = (e: any) => {
        e.preventDefault()
        console.log('submitted')

        const name = e.target.name.value
        const description = e.target.description.value
        
        setData({
            name,
            description
        })

    }












  return (
    <Dialog open={open} onOpenChange={setOpen}>    
      <DialogTrigger asChild>
        <Button variant="outline">Create a new Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <DialogDescription>
            Add a new task for your project
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Description" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
            
          <Button type="submit" onClick={()=> {handleSubmit; setOpen(false); getData}} onSubmit={() => setOpen(false)} >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
