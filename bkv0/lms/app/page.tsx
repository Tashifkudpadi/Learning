import AuthForm from "@/components/auth-form";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden flex items-center justify-center">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-white/5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 text-left">
              {/* Left - Welcome Message */}
              <div className="lg:w-1/2 space-y-4 text-white text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium justify-center lg:justify-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Welcome to Aram IAS
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-lg">
                  Learning Management
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    System
                  </span>
                </h1>
                <p className="max-w-md text-blue-100 text-lg md:text-xl leading-relaxed mx-auto lg:mx-0">
                  Empower your educational journey with our comprehensive
                  learning platform. Access courses, track progress, and achieve
                  your goals.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/80 text-sm pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">📚</span>
                    </div>
                    <span>1000+ Courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">👥</span>
                    </div>
                    <span>50k+ Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">⭐</span>
                    </div>
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>

              {/* Right - Auth Form */}
              <div className="lg:w-1/2 w-full max-w-md mx-auto bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
