"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from '@/components/ui/drawer'
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useModal } from '@/providers/modal-provider'
import { Button } from '@/components/ui/button'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useZapStore } from '@/lib/store'
 
const formSchema = z.object({
  from: z.string().min(2).max(50),
  to:z.string().min(2),
  subject:z.string().min(2),
  body:z.string().min(2)
})

export default function DrawerModal({name,id}:{name:string,id:string}){
    const zapStore = useZapStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          from: "",
          to:"",
          subject:"",
          body:""
        },
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
      
        let wrppedFrom = `{${values.from}}`;
        let wrppedTo = `{${values.to}}`;
        let wrappedSubject = `{${values.subject}}`
        let wrappedBody = `{${values.body}}`
        values.body=wrappedBody;
        values.from=wrppedFrom;
        values.to=wrppedTo;
        values.subject=wrappedSubject;
        console.log(values)
        zapStore.setZapStepActionMetaData(id,values)
        setClose();
      }

    const {isOpen,setClose} =useModal()

    const handleClose = () => setClose()
    return(
      <Drawer
      open={isOpen}
      onClose={handleClose}
    >
      <DrawerContent >
      <div className="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle className="text-5xl">{name}</DrawerTitle>
          <DrawerDescription>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0 min-h-96">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="from" {...field} />
              </FormControl>
              <FormDescription>
                This is the key of gmail you are going to send in request body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TO</FormLabel>
              <FormControl>
                <Input placeholder="to" {...field} />
              </FormControl>
              <FormDescription>
                This is the key of gmail you are going to send in request body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="subject" {...field} />
              </FormControl>
              <FormDescription>
                This is the key of subject you are going to send in request body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="body" {...field} />
              </FormControl>
              <FormDescription>
                This is the key of body you are going to send in request body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
            </div>
       
        <DrawerFooter className="flex flex-col gap-4 bg-background  border-t-muted">
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClose}
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
    )
  }