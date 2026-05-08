import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:glass-strong group-[.toaster]:text-foreground group-[.toaster]:border-white/10 group-[.toaster]:shadow-elevated rounded-2xl p-4",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:gradient-button group-[.toast]:text-white rounded-full",
          cancelButton: "group-[.toast]:glass group-[.toast]:text-muted-foreground rounded-full",
          error: "group-[.toaster]:text-rose",
          success: "group-[.toaster]:text-sage",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
