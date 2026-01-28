import { Header, Footer } from "@/layouts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { GraduationCap, Video, Award, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function UniversityPage() {
    const courses = [
        {
            level: "Beginner",
            courses: [
                {
                    title: "CMS Fundamentals",
                    duration: "2 hours",
                    students: "5,234",
                    description: "Learn the basics of content management",
                    icon: <BookOpen className="h-5 w-5" />
                },
                {
                    title: "Getting Started with APIs",
                    duration: "1.5 hours",
                    students: "3,891",
                    description: "Introduction to headless CMS APIs",
                    icon: <Video className="h-5 w-5" />
                }
            ]
        },
        {
            level: "Intermediate",
            courses: [
                {
                    title: "Advanced Content Modeling",
                    duration: "3 hours",
                    students: "2,456",
                    description: "Master complex content structures",
                    icon: <BookOpen className="h-5 w-5" />
                },
                {
                    title: "Integration Patterns",
                    duration: "2.5 hours",
                    students: "1,987",
                    description: "Connect with third-party services",
                    icon: <Video className="h-5 w-5" />
                }
            ]
        },
        {
            level: "Advanced",
            courses: [
                {
                    title: "Performance Optimization",
                    duration: "4 hours",
                    students: "1,234",
                    description: "Scale your CMS to millions of requests",
                    icon: <BookOpen className="h-5 w-5" />
                },
                {
                    title: "Enterprise Architecture",
                    duration: "5 hours",
                    students: "892",
                    description: "Build enterprise-grade solutions",
                    icon: <Video className="h-5 w-5" />
                }
            ]
        }
    ];

    const certifications = [
        {
            title: "Certified CMS Developer",
            description: "Demonstrate your expertise in building content-driven applications",
            duration: "3 months",
            icon: <Award className="h-8 w-8" />
        },
        {
            title: "Certified CMS Architect",
            description: "Prove your ability to design scalable content architectures",
            duration: "6 months",
            icon: <Award className="h-8 w-8" />
        }
    ];

    return (
        <div className="flex flex-col bg-background text-foreground min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background">
                    <div className="container px-4 md:px-8">
                        <Breadcrumb items={[{ label: "Resources" }, { label: "University" }]} />

                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
                                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
                                University
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                                Video courses and certifications to master content management and become an expert.
                            </p>
                            <Link
                                href="#courses"
                                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base lg:text-lg min-h-[44px]"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-y bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50+</div>
                                <div className="text-sm text-muted-foreground">Video Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">15k+</div>
                                <div className="text-sm text-muted-foreground">Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">200+</div>
                                <div className="text-sm text-muted-foreground">Hours Content</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">4.8</div>
                                <div className="text-sm text-muted-foreground">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses by Level */}
                <section id="courses" className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Learning Paths</h2>

                            <div className="space-y-12">
                                {courses.map((level, index) => (
                                    <div key={index}>
                                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                            <span className="w-2 h-8 bg-primary rounded-full" />
                                            {level.level}
                                        </h3>
                                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                                            {level.courses.map((course, courseIndex) => (
                                                <div
                                                    key={courseIndex}
                                                    className="group bg-card border border-border rounded-lg p-4 sm:p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                            {course.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                                                            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3.5 w-3.5" />
                                                                    {course.duration}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Users className="h-3.5 w-3.5" />
                                                                    {course.students} students
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href="#enroll"
                                                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                                    >
                                                        Start Learning →
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="py-16 sm:py-20 bg-muted/30">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Professional Certifications</h2>
                                <p className="text-lg text-muted-foreground">
                                    Validate your skills with industry-recognized certifications
                                </p>
                            </div>

                            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-lg p-6 sm:p-8 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
                                            {cert.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                                        <p className="text-muted-foreground mb-4">{cert.description}</p>
                                        <div className="text-sm text-muted-foreground mb-6">
                                            Duration: {cert.duration}
                                        </div>
                                        <Link
                                            href="#apply"
                                            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium min-h-[44px]"
                                        >
                                            Apply Now
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20">
                    <div className="container px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-primary/20">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join thousands of developers advancing their careers with our courses.
                            </p>
                            <Link
                                href="#enroll"
                                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base lg:text-lg min-h-[44px]"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
