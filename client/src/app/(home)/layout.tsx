import { AppShell, LoadingScreen } from "@/components/layout";
import TransitionProvider from "@/components/providers/TransitionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoadingScreen />
      <TransitionProvider>
        <AppShell>{children}</AppShell>
      </TransitionProvider>
    </>
  );
}
