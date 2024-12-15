import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface MailLog {
  id: number;
  studentId: string;
  date: string;
  subject: string;
  type: string;
  status: string;
}

interface StudentMailLogsProps {
  studentId: string;
  logs: MailLog[];
}

export function StudentMailLogs({ studentId, logs }: StudentMailLogsProps) {
  const studentLogs = logs.filter(log => log.studentId === studentId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mail Logs</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {studentLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{log.subject}</p>
                <p className="text-sm text-gray-500">{log.date}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {log.status}
              </span>
            </div>
          ))}
          {studentLogs.length === 0 && (
            <p className="text-center text-gray-500">No mail logs found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}