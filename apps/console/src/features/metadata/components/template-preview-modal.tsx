import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Network, Layers, ArrowRight } from 'lucide-react';
import type { BlueprintSummary } from '../api/types';

export interface TemplatePreviewModalProps {
  blueprint: BlueprintSummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAndProvision?: (blueprintId: string) => void;
}

const CustomModelNode = ({ data }: { data: { label: string; fields: string[]; icon?: string } }) => {
  return (
    <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-sky-500/40 shadow-xl shadow-sky-500/10 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="!bg-sky-500 !w-3 !h-3" />
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200/50 dark:border-slate-800">
        <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Layers className="w-4 h-4" />
        </div>
        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
          {data.label}
        </span>
      </div>
      <div className="pt-2 space-y-1">
        {data.fields.map((f, i) => (
          <div key={i} className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>• {f}</span>
            <span className="text-[9px] px-1 rounded bg-slate-100 dark:bg-slate-800">string</span>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-500 !w-3 !h-3" />
    </div>
  );
};

const nodeTypes = {
  modelNode: CustomModelNode,
};

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  blueprint,
  open,
  onOpenChange,
  onSelectAndProvision,
}) => {
  if (!blueprint) return null;

  const mockGraphData = useMemo(() => {
    if (blueprint.id === 'bp_cms_publishing_v1') {
      const nodes: Node[] = [
        {
          id: '1',
          type: 'modelNode',
          position: { x: 50, y: 50 },
          data: { label: 'Article & Editorial Post', fields: ['title', 'slug', 'body_content', 'status', 'published_at'] },
        },
        {
          id: '2',
          type: 'modelNode',
          position: { x: 350, y: 50 },
          data: { label: 'Content Category', fields: ['category_name', 'slug', 'description', 'parent_id'] },
        },
        {
          id: '3',
          type: 'modelNode',
          position: { x: 200, y: 220 },
          data: { label: 'Media Asset', fields: ['asset_name', 'file_url', 'mime_type', 'file_size_bytes'] },
        },
      ];
      const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true, label: 'belongs_to_category' },
        { id: 'e1-3', source: '1', target: '3', animated: true, label: 'featured_media' },
      ];
      return { nodes, edges };
    }

    if (blueprint.id === 'bp_logistics_v1') {
      const nodes: Node[] = [
        {
          id: '1',
          type: 'modelNode',
          position: { x: 80, y: 80 },
          data: { label: 'Fleet Vehicle', fields: ['license_plate', 'vehicle_type', 'driver_name', 'status'] },
        },
        {
          id: '2',
          type: 'modelNode',
          position: { x: 380, y: 80 },
          data: { label: 'Dispatch Order', fields: ['tracking_number', 'delivery_status', 'recipient_address', 'item_count'] },
        },
      ];
      const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true, label: 'assigned_vehicle' },
      ];
      return { nodes, edges };
    }

    if (blueprint.id === 'bp_crm_billing_v1') {
      const nodes: Node[] = [
        {
          id: '1',
          type: 'modelNode',
          position: { x: 80, y: 80 },
          data: { label: 'Corporate Customer Account', fields: ['legal_name', 'contact_email', 'subscription_tier', 'vat_tax_id'] },
        },
        {
          id: '2',
          type: 'modelNode',
          position: { x: 380, y: 80 },
          data: { label: 'Cloud Compute Allocation', fields: ['resource_code', 'vcpu_cores', 'ram_gib', 'gpu_enabled'] },
        },
      ];
      const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true, label: 'allocated_spec' },
      ];
      return { nodes, edges };
    }

    const nodes: Node[] = [
      {
        id: '1',
        type: 'modelNode',
        position: { x: 200, y: 100 },
        data: { label: 'Custom Model (Blank Canvas)', fields: ['custom_field_1', 'custom_field_2'] },
      },
    ];
    return { nodes, edges: [] };
  }, [blueprint.id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Network className="w-5 h-5" />
              <DialogTitle className="text-xl font-bold">
                Interactive React Flow Graph Diagram: {blueprint.name}
              </DialogTitle>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {blueprint.entityTypesCount} Models • {blueprint.relationshipsCount} Graph Edges
            </span>
          </div>
          <DialogDescription className="text-xs text-slate-500 mt-1">
            Visual Schema Topology & Pattern C Relationship Linkages
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-[420px]">
          {/* React Flow Interactive Canvas */}
          <div className="lg:col-span-2 relative bg-slate-50 dark:bg-slate-950 border-r border-slate-200/50 dark:border-slate-800">
            <ReactFlow
              nodes={mockGraphData.nodes}
              edges={mockGraphData.edges}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background color="#94a3b8" gap={16} size={1} />
              <Controls className="!bg-white/80 dark:!bg-slate-900/80 !border-none !rounded-xl !shadow-md" />
              <MiniMap className="!bg-white/80 dark:!bg-slate-900/80 !rounded-xl" />
            </ReactFlow>
          </div>

          {/* Sample Form Fields Preview Side Panel */}
          <div className="p-5 space-y-4 overflow-y-auto bg-slate-100/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Sample Dynamic Form Layout</span>
            </div>

            <div className="space-y-3 text-xs">
              {blueprint.id === 'bp_logistics_v1' ? (
                <>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Tracking Number</label>
                    <input readOnly value="TRK-98742158" className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-mono" />
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Delivery Status</label>
                    <select disabled className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-medium">
                      <option>DISPATCHED</option>
                      <option>IN_TRANSIT</option>
                      <option>DELIVERED</option>
                    </select>
                  </div>
                </>
              ) : blueprint.id === 'bp_crm_billing_v1' ? (
                <>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">VAT Tax ID</label>
                    <input readOnly value="VAT-0318957102" className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-mono" />
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Subscription Tier</label>
                    <select disabled className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-medium">
                      <option>Enterprise</option>
                      <option>Pro Max</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Article Title</label>
                    <input readOnly value="Scaling Multi-Tenant Metadata Architecture" className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-medium" />
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Publication Status</label>
                    <select disabled className="w-full px-2 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 font-medium">
                      <option>PUBLISHED</option>
                      <option>DRAFT</option>
                      <option>IN_REVIEW</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <Button
                onClick={() => {
                  onOpenChange(false);
                  if (onSelectAndProvision) onSelectAndProvision(blueprint.id);
                }}
                className="w-full gap-2 text-xs bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold py-2 rounded-xl"
              >
                <span>Initialize This Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
