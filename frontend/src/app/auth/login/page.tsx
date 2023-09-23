import Input from "@/components/Input";


export default function Login(){
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="p-8 overflow-hidden flex flex-col justify-center items-center">
                <h1 className="text-5xl  font-bold bg-gradient-to-r to-accent from-text  bg-clip-text text-transparent">Welcome Back!</h1>
                <div className="flex flex-col gap-4 py-4">
                    <Input>Username</Input>
                    <Input type="password">Password</Input>
                </div>
            </div>
        </main>
    )
}

