import { Shield, Lock, Users, Award, CheckCircle, Globe } from 'lucide-react'

export default function TrustIndicators() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands Worldwide</h2>
          <p className="text-gray-600">Your privacy and security are our top priorities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">SSL Secured</h3>
            <p className="text-sm text-gray-600">256-bit encryption</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
            <p className="text-sm text-gray-600">No data stored</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">50K+ Users</h3>
            <p className="text-sm text-gray-600">Monthly active</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">99.9% Uptime</h3>
            <p className="text-sm text-gray-600">Reliable service</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">GDPR Compliant</h3>
            <p className="text-sm text-gray-600">Data protection</p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Global CDN</h3>
            <p className="text-sm text-gray-600">Fast worldwide</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>All systems operational</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Security badges component
export function SecurityBadges() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-6">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Shield className="w-4 h-4 text-green-600" />
        <span>SSL Certificate</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Lock className="w-4 h-4 text-blue-600" />
        <span>Privacy Protected</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Award className="w-4 h-4 text-yellow-600" />
        <span>Trusted Service</span>
      </div>
    </div>
  )
}
