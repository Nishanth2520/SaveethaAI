
"use client"; 

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import Chatbot from "@/components/user/Chatbot";
import { CalendarPlus, MessageCircleQuestion, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (role === 'doctor') {
          router.replace('/doctor-dashboard');
        } else if (role === 'user') {
          router.replace('/dashboard');
        } else {
          // This case should ideally not happen if role is always set on login
          // For safety, redirect to login if role is unclear but user is authenticated
          console.warn("User authenticated but role is unclear. Redirecting to login.");
          router.replace('/login');
        }
      }
      // If !user, we don't redirect. The public page content will be shown.
    }
  }, [user, role, loading, router]);

  if (loading) { 
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is logged in but redirection hasn't happened yet (e.g., due to useEffect async nature)
  // This helps prevent a flash of the public homepage for logged-in users.
  if (user && !loading) { 
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <LoadingSpinner />
        </div>
      );
  }

  // If !user and !loading, render the public homepage
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-secondary/10 to-secondary/30">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="mb-8 inline-block">
            <Logo size={64} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Welcome to Saveetha AI
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Your intelligent health companion. Get insights on symptoms or schedule appointments, all powered by cutting-edge AI.
          </p>
        </section>
        
        {/* Main Features Section - 2 Column Layout */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12 sm:mb-16">Explore Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* AI Symptom Helper Card */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <MessageCircleQuestion className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI Symptom Helper</CardTitle>
                  <CardDescription className="text-base">
                    Get quick insights about your symptoms. Our AI can guide you, but always consult a doctor for medical advice.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="shadow-md hover:shadow-primary/20 transition-shadow mt-2">
                        <Zap className="mr-2 h-5 w-5" />
                        Ask our AI
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[650px] p-0">
                      <Chatbot />
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="justify-center text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    For more personalized features and to save your history, please <Link href="/login" className="underline text-primary hover:text-primary/80">login or create an account</Link>.
                  </p>
                </CardFooter>
              </Card>

              {/* Book an Appointment Card */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                   <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <CalendarPlus className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Schedule a Consultation</CardTitle>
                  <CardDescription className="text-base">
                    Ready to speak with a professional? Book an appointment through our demonstration system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
                  <Button asChild size="lg" className="shadow-md hover:shadow-primary/20 transition-shadow mt-2">
                    <Link href="/book-appointment">
                      <Zap className="mr-2 h-5 w-5" />
                      Book Now (Demo)
                    </Link>
                  </Button>
                </CardContent>
                <CardFooter className="justify-center text-center pt-4">
                   <p className="text-xs text-muted-foreground">
                    Full booking confirmation and management are available for registered users. <Link href="/login" className="underline text-primary hover:text-primary/80">Login or sign up</Link> to access.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

      </main>
      <footer className="py-8 border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <Logo size={24} />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saveetha AI. Your health, intelligently managed.
          </p>
          <p className="text-xs text-muted-foreground">
            Disclaimer: Information provided is for general guidance and not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
