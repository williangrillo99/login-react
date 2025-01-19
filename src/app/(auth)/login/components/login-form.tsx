'use client'
import { useRouter } from "next/navigation" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
const formSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    senha: z.string().nonempty("Password is required"),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
   
        try {
            const response = await fetch('https://localhost:7175/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            const responseText = await response.text()
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Erro ao logar", 
                    description: `${responseText}`,
                })
                return
            }
            router.push('/dashboard')
        } catch (error) {
            toast({
              variant: "destructive",
              title: "Erro de conexão",
              description: error instanceof Error ? error.message : "Erro ao conectar com o servidor",
            })
          } 
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Login</FormLabel>
                                    <FormControl>
                                        <Input placeholder="your email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                            <FormField control={form.control} name="senha" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password"   {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="underline underline-offset-4">
                            Sign up
                        </a>
                        
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
