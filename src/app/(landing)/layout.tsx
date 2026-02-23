export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-page-bg text-text-primary">
      {children}
    </div>
  );
}
